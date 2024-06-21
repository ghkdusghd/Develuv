import MatchingItem from './MatchingItem.jsx'
import { useEffect, useRef, useState } from 'react'
import './MatchingItem.css'
import axios from 'axios'

const MatchingList = ({
  matchList,
  matchType,
  setMatchList,
  setMatchType,
  user_id,
}) => {
  const address = useRef('')

  useEffect(() => {
    if (
      matchType === 'nbti' ||
      matchType === 'rematch' ||
      matchType === 'fame'
    ) {
      // 이미 matchList가 설정되어 있으면 새로 데이터를 가져오지 않음
      return
    }
    axios
      .get('http://localhost:8080/matchingList/getUserAdr', {
        params: {
          user_id: user_id,
        },
      })
      .then((response) => {
        address.current = response.data
        console.log(address.current)
        getMatchList()
      })
      .catch((error) => {
        console.log('error get address => ', error)
      })
  }, [matchType])

  function getMatchList() {
    const formData = new FormData()
    if (matchType === 'normal') {
      // 일반 매칭 검색
      console.log('before call List address : ' + address.current)
      formData.append('searchAdr', address.current)
      axios
        .get('http://localhost:8080/matchingList', {
          params: {
            searchAdr: address.current,
          },
        })
        .then((response) => {
          setMatchList(response.data)
          console.log(matchList)
          testGeopoint();
        })
        .catch((error) => {
          console.error('Error getList normal => ', error)
        })
    } else if (matchType === 'rematch') {
      // 다시 검색
      console.log('before call List address : ' + address.current)
      formData.append('searchAdr', address.current)
      axios
        .get('http://localhost:8080/matchingList/rematch', {
          params: {
            searchAdr: address.current,
          },
        })
        .then((response) => {
          setMatchList(response.data)
          console.log(matchList)
        })
        .catch((error) => {
          console.error('Error getList rematch => ', error)
        })
    } else if (matchType === 'nbti') {
      // 선택한 nbti로 검색
      console.log(matchType)
      formData.append('searchAdr', address.current)
      axios
        .get('http://localhost:8080/matchingList/nbti', {
          params: {
            searchAdr: address.current,
          },
        })
        .then((response) => {
          setMatchList(response.data)
          console.log(matchList)
        })
        .catch((error) => {
          console.error('Error getList nbti => ', error)
        })
    } else if (matchType === 'fame') {
      // 유명한순
      formData.append('searchAdr', address.current)
      axios
        .get('http://localhost:8080/matchingList/fame', {
          params: {
            searchAdr: address.current,
          },
        })
        .then((response) => {
          setMatchList(response.data)
          console.log(matchList)
        })
        .catch((error) => {
          console.error('Error getList fame => ', error)
        })
    }
  }

  function testGeopoint() {
    console.log("axios 호출전");
    const formdata = new FormData();
    let inaddress = "서울시강남구도곡로143";

    formdata.append("saddress", inaddress);
    axios
      .get("http://localhost:8080/matching/geopoint?saddress="+inaddress)
      .then((response) => {
        console.log("받은 좌표값: " + response.data);
      })
      .catch((error) => {
        console.log("error get geopoint => ", error);
      });
  }

  return (
    <div className={'MatchingList'}>
      <div className={'MatchingItems'}>
        {matchList.map((item) => (
          <MatchingItem
            key={item.user_id}
            user_id={item.user_id}
            user_name={item.user_name}
            user_gender={item.user_gender}
            user_adress={item.user_address}
            user_nbti={item.user_nbti}
            user_profile={item.user_profile}
          />
        ))}
      </div>
    </div>
  )
}

export default MatchingList
