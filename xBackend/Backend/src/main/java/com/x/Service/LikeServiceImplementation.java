package com.x.Service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.x.exception.TwitException;
import com.x.exception.UserException;
import com.x.model.Like;
import com.x.model.Twit;
import com.x.model.User;
import com.x.repository.LikeRepositry;
import com.x.repository.TwitRepository;



@Service
public class LikeServiceImplementation implements LikeService {
	@Autowired
	private LikeRepositry likeRepositry;
	@Autowired
	private TwitService twitService;
	@Autowired
	private TwitRepository twitRpeository ;
	

	@Override
	public Like likeTwit(Long twitId, User user) throws UserException, TwitException {


		Like isLikeExist = likeRepositry.isLikeExist(user.getId(),twitId);
		
		if(isLikeExist!=null)
		{
			likeRepositry.deleteById(isLikeExist.getId());
			return isLikeExist;
		}
		
		Twit twit = twitService.findById(twitId);
		
		Like like = new Like();
		like.setTwit(twit);
		like.setUser(user);
		Like savedLike = likeRepositry.save(like);
		
		twit.getLikes().add(savedLike);
		twitRpeository.save(twit);
		
		return savedLike;
	}

	public List<Like> getAllLikes(Long twitId) throws TwitException {
		
		Twit twit = twitService.findById(twitId);
		
		List<Like>likes =likeRepositry.findByTwitid(twitId);
		
		return likes;
	}	

}
