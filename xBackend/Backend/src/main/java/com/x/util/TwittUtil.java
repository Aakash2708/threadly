package com.x.util;

import com.x.model.Like;
import com.x.model.Twit;
import com.x.model.User;

public class TwittUtil {

	public final static boolean isLikedByReqUser(User reqUser ,Twit twit)
	{
		for(Like like : twit.getLikes())
		{
			if(like.getUser().equals(reqUser.getId()))
			{
				return true;
			}
		}
		return false;
	}
	
	public final static boolean isRetwitedByReqUser(User reqUser , Twit twit)
	{
		for(User user : twit.getRetwitUser())
		{
			if(user.getId().equals(reqUser.getId()))
			{
				return true;
			}
		}
		return false;
	}
}
