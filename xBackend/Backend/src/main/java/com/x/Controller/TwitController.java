package com.x.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.x.Request.TwitReplyRequest;
import com.x.Service.TwitService;
import com.x.Service.UserService;
import com.x.dto.TwitDto;
import com.x.exception.TwitException;
import com.x.exception.UserException;
import com.x.mapper.TwitDtoMapper;
import com.x.model.Twit;
import com.x.model.User;
import com.x.response.ApiResponse;

@RestController
@RequestMapping("api/twits")
public class TwitController {
	
	@Autowired
	private TwitService twitService ;

	@Autowired
	private UserService userService;
	
	@PostMapping("/create")
	public  ResponseEntity<TwitDto>createTwit(@RequestBody Twit req,
			@RequestHeader("Authorization") String jwt)throws UserException,TwitException
	{
		User user = userService.findUserProfileByJwt(jwt);
		
		Twit twit = twitService.createTwit(req, user);
		TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
		return new ResponseEntity<>(twitDto,HttpStatus.CREATED);
	}
	@PostMapping("/reply")
	public  ResponseEntity<TwitDto>replyTwit(@RequestBody TwitReplyRequest req,
			@RequestHeader("Authorization") String jwt)throws UserException,TwitException
	{
		User user = userService.findUserProfileByJwt(jwt);
		
		Twit twit = twitService.createReply(req,user);
		TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
		return new ResponseEntity<>(twitDto,HttpStatus.CREATED);
	}
	
	@PutMapping("/{twitId}/retwit")
	public  ResponseEntity<TwitDto>reTwit(@RequestBody TwitReplyRequest req,
			@RequestHeader("Authorization") String jwt)throws UserException,TwitException
	{
		User user = userService.findUserProfileByJwt(jwt);
		
		Twit twit = twitService.createReply(req,user);
		TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
		return new ResponseEntity<>(twitDto,HttpStatus.OK);
	}
	
	@GetMapping("/{twitId}")
	public  ResponseEntity<TwitDto> findTwitById(@RequestBody Long twitId,
			@RequestHeader("Authorization") String jwt)throws UserException,TwitException
	{
		User user = userService.findUserProfileByJwt(jwt);
		
		Twit twit = twitService.findById(twitId);
		TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
		return new ResponseEntity<>(twitDto,HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{twitId}")
	public  ResponseEntity<ApiResponse> deleteTwit(@RequestBody Long twitId,
			@RequestHeader("Authorization") String jwt)throws UserException,TwitException
	{
		User user = userService.findUserProfileByJwt(jwt);
		
		twitService.deleteTwitById(twitId,user.getId());
		
		ApiResponse res = new ApiResponse();
		res.setMessage("Tweeted SucessFully");
		res.setStatus(true);
		
		return new ResponseEntity<>(res,HttpStatus.CREATED);
	}
	

	@GetMapping("/")
	public  ResponseEntity<List<TwitDto>> getAllTwits(	@RequestHeader("Authorization") String jwt)throws UserException,TwitException
	{
		User user = userService.findUserProfileByJwt(jwt);
		
		List<Twit> twits = twitService.findAllTwit();
		List<TwitDto> twitDtos = TwitDtoMapper.toTwitDtos(twits, user);
		return new ResponseEntity<>(twitDtos,HttpStatus.OK);
	}
	
	@GetMapping("/user/{userId}")
	public  ResponseEntity<List<TwitDto>> getUsersAllTwit(@PathVariable Long userId ,	@RequestHeader("Authorization") String jwt)throws UserException,TwitException
	{
		User user = userService.findUserProfileByJwt(jwt);
		
		List<Twit> twits = twitService.getUserTwit(user);
		List<TwitDto> twitDtos = TwitDtoMapper.toTwitDtos(twits, user);
		return new ResponseEntity<>(twitDtos,HttpStatus.OK);
	}
	
	@GetMapping("/user/{userId}/likes")
	public  ResponseEntity<List<TwitDto>> findTwitByLikesContainsUser(@PathVariable Long userId ,	@RequestHeader("Authorization") String jwt)throws UserException,TwitException
	{
		User user = userService.findUserProfileByJwt(jwt);
		
		List<Twit> twits = twitService.findByLikesContainsUser(user);
		List<TwitDto> twitDtos = TwitDtoMapper.toTwitDtos(twits, user);
		return new ResponseEntity<>(twitDtos,HttpStatus.OK);
	}

}
