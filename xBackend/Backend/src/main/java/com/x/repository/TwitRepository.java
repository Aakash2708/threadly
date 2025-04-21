package com.x.repository;

import java.beans.JavaBean;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.x.model.Twit;
import com.x.model.User;


public interface TwitRepository extends JpaRepository<Twit, Long> {
	
	  @Query("SELECT t FROM Twit t WHERE t.isTwit = true ORDER BY t.createdAt DESC")
	    List<Twit> findAllTwits();
	
	@Query("SELECT t FROM Twit t WHERE (t.user.id = :userId OR :user MEMBER OF t.retwitUser) AND t.isTwit = true ORDER BY t.createdAt DESC")
    List<Twit> findUserTwits(@Param("user") User user, @Param("userId") Long userId);

	List<Twit>findByLikesContainingOrderByCreatedAtDesc(User user);
	
	@Query("Select t from Twit t JOIN t.likes L where L.user.id=:userId")
	List<Twit>findByLikesUser_id(Long userId);
 
}
