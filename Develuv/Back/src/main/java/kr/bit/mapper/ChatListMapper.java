package kr.bit.mapper;

import kr.bit.dto.ChatListDTO;
import kr.bit.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ChatListMapper {

    @Select("SELECT cl.user_id AS userId, cl.room_id AS roomId, cr.room_name AS roomName, cr.room_create_time AS roomCreateTime " +
            "FROM chatlists cl " +
            "JOIN chatroom cr ON cl.room_id = cr.room_id " +
            "WHERE cl.user_id = #{userId}")
    List<ChatListDTO> getChatListsByUserId(@Param("userId") String userId);

    @Select("SELECT u.user_id AS user_id, u.user_name AS user_name " +
            "FROM chatlists cl " +
            "JOIN users u ON cl.user_id = u.user_id " +
            "WHERE cl.room_id = #{roomId}")
    List<UserDto> getParticipantsByRoomId(@Param("roomId") String roomId);

    @Select("SELECT u.user_id AS userId, u.user_name AS userName " +
            "FROM users u " +
            "WHERE u.room_id = #{roomId}")
    List<UserDto> getUsersByRoomId(@Param("roomId") String roomId);
}
