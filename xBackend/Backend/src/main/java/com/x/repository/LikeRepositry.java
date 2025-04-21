package com.x.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.x.model.Like;

public interface LikeRepositry extends JpaRepository<Like, Long> {
	
	@Query("SELECT l FROM Like l WHERE l.user.id=:userId AND l.twit.id =:twitId ")
	public Like isLikeExist(@Param ("userId") Long userId ,@Param("twitId")Long twitId);
	
	@Query("SELECT l FROM Like AS l WHERE l.twit.id=:twitid")
	public List<Like>findByTwitid(@Param("twitid") Long twitId);
	

}
