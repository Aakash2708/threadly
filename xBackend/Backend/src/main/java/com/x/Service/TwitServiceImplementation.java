package com.x.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.x.Request.TwitReplyRequest;
import com.x.exception.TwitException;
import com.x.exception.UserException;
import com.x.model.Twit;
import com.x.model.User;
import com.x.repository.TwitRepository;

@Service
public class TwitServiceImplementation implements TwitService {
	
	@Autowired
	private TwitRepository twitRepositry;

	@Override
	public Twit createTwit(Twit req, User user) throws UserException {
		Twit twit = new Twit();
		twit.setContent(req.getContent());
		twit.setCreatedAt(LocalDateTime.now());
		twit.setImage(req.getImage());
		twit.setUser(user);
		twit.setReply(false);
		twit.setTwit(true);
		twit.setVideo(req.getVideo());

		return twitRepositry.save(twit);
	}

	@Override
	public List<Twit> findAllTwit() {
		// Fixed method call typo: changed "isTwittTrue" to "isTwitTrue"
		return twitRepositry.findAllTwits();
	}

	@Override
	public Twit retwit(Long twitId, User user) throws UserException, TwitException {
		Twit twit = findById(twitId);
		if (twit.getRetwitUser().contains(user)) {
			twit.getRetwitUser().remove(user);
		} else {
			twit.getRetwitUser().add(user);
		}

		return twitRepositry.save(twit);
	}

	@Override
	public Twit findById(Long twitId) throws TwitException {
		// Improved exception message
		return twitRepositry.findById(twitId)
				.orElseThrow(() -> new TwitException("Twit not found with ID: " + twitId));
	}

	@Override
	public void deleteTwitById(Long twitId, Long userId) throws TwitException, UserException {
		Twit twit = findById(twitId);
		if (!userId.equals(twit.getUser().getId())) {
			throw new UserException("You can't delete another user's tweet.");
		}
		twitRepositry.deleteById(twit.getId());
	}

	@Override
	public Twit removeFromRetwit(Long twitId, User user) throws TwitException, UserException {
		Twit twit = findById(twitId);
		if (!twit.getRetwitUser().contains(user)) {
			throw new TwitException("User has not retweeted this twit.");
		}
		twit.getRetwitUser().remove(user);
		return twitRepositry.save(twit);
	}

	@Override
	public Twit createReply(TwitReplyRequest req, User user) throws TwitException {
		Twit replyFor = findById(req.getTwitId());

		Twit twit = new Twit();
		twit.setContent(req.getContent());
		twit.setCreatedAt(LocalDateTime.now());
		twit.setImage(req.getImage());
		twit.setUser(user);
		twit.setReply(true);
		twit.setTwit(false);
		twit.setReplyFor(replyFor);

		Twit savedReply = twitRepositry.save(twit);
		replyFor.getReplyTwits().add(savedReply);

		twitRepositry.save(replyFor);
		return savedReply; // Fixed return value to return the newly created reply
	}

	@Override
	public List<Twit> getUserTwit(User user) {
		// Fixed repository method call format
		return twitRepositry.findUserTwits(user,user.getId());
	}

	@Override
	public List<Twit> findByLikesContainsUser(User user) {
		// Fixed repository method call format
		return twitRepositry.findByLikesUser_id(user.getId());
	}
}
