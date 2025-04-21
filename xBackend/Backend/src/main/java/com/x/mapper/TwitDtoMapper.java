package com.x.mapper;

import java.util.ArrayList;
import java.util.List;

import com.x.dto.TwitDto;
import com.x.dto.UserDto;
import com.x.model.Twit;
import com.x.model.User;
import com.x.util.TwittUtil;

public class TwitDtoMapper {

	public static TwitDto toTwitDto(Twit twit ,User reqUser)
	{
		UserDto user= UserDtoMapper.toUserDto(twit.getUser());
		
		boolean isLiked = TwittUtil.isLikedByReqUser(reqUser,twit);
		
		boolean isretwited = TwittUtil.isRetwitedByReqUser(reqUser, twit);
		List<Long> retwitUserId = new ArrayList<>();
		
		for(User user1 :twit.getRetwitUser())
		{
			retwitUserId.add(user1.getId());
		}
		
		
		TwitDto twitDto = new TwitDto();
		
		twitDto.setId(twit.getId());
		
		twitDto.setContent(twit.getContent());
		twitDto.setCreatedAt(twit.getCreatedAt());
		twitDto.setImage(twit.getImage());
		twitDto.setTotalLikes(twit.getLikes().size());
		twitDto.setTotalReplies(twit.getReplyTwits().size());
		twitDto.setTotalRetwits(twit.getRetwitUser().size());
		twitDto.setUser(user);
		twitDto.setLiked(isLiked);
		twitDto.setRetwit(isretwited);
		twitDto.setRetwitUserId(retwitUserId);
		twitDto.setReplyTwits(toTwitDtos(twit.getReplyTwits(), reqUser));
		twitDto.setVideo(twit.getVideo());;
		return twitDto;
	}
	
	public static List<TwitDto>toTwitDtos(List<Twit>twits ,User reqUser)
	{
		List<TwitDto>twitDtos= new ArrayList<>();
		for(Twit twit:twits) {
			TwitDto twitDto = toReplyTwitDto(twit,reqUser);
		    twitDtos.add(twitDto);
		}
		return twitDtos;
	}

	private static TwitDto toReplyTwitDto(Twit twit, User reqUser) {
		
UserDto user= UserDtoMapper.toUserDto(twit.getUser());
		
		boolean isLiked = TwittUtil.isLikedByReqUser(reqUser,twit);
		
		boolean isretwited = TwittUtil.isRetwitedByReqUser(reqUser, twit);
		List<Long> retwitUserId = new ArrayList<>();
		
		for(User user1 :twit.getRetwitUser())
		{
			retwitUserId.add(user1.getId());
		}
		
		
		TwitDto twitDto = new TwitDto();
		
		twitDto.setId(twit.getId());
		
		twitDto.setContent(twit.getContent());
		twitDto.setCreatedAt(twit.getCreatedAt());
		twitDto.setImage(twit.getImage());
		twitDto.setTotalLikes(twit.getLikes().size());
		twitDto.setTotalReplies(twit.getReplyTwits().size());
		twitDto.setTotalRetwits(twit.getRetwitUser().size());
		twitDto.setUser(user);
		twitDto.setLiked(isLiked);
		twitDto.setRetwit(isretwited);
		twitDto.setRetwitUserId(retwitUserId);
	
		twitDto.setVideo(twit.getVideo());
		return twitDto;
		
	}
}
