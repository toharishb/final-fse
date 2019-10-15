package com.stackroute.keepnote.aspectj;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/* Annotate this class with @Aspect and @Component */

@Aspect
@Component
public class LoggingAspect {
	/*
	 * Write loggers for each of the methods of User controller, any particular
	 * method will have all the four aspectJ annotation
	 * (@Before, @After, @AfterReturning, @AfterThrowing).
	 */
private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);
	
	@Before("execution(* com.stackroute.keepnote.controller.ReminderController.*(..))")
	public void before() {
		logger.debug("registerUser method of UserController called");
	}
	
	@Pointcut("execution (* com.stackroute.keepnote.controller.ReminderController.*(..))")
	public void allControllerMethods(){
	}

	@Before("allControllerMethods()")
	public void beforeAdvice(JoinPoint joinPoint) {
		logger.info(joinPoint.getSignature().getName() + " before called...");
	}
	
	@After("allControllerMethods()")
	public void afterAdvice(JoinPoint joinPoint) {
		logger.debug("Method Name : " + joinPoint.getSignature().getName());
	}
	
	@AfterReturning(value="allControllerMethods()")
	public void afterReturningAdvice(JoinPoint joinPoint) {
		logger.debug("Method Name : " + joinPoint.getSignature().getName());
	}
	
	@AfterThrowing(value="allControllerMethods()", throwing="error")
	public void afterThrowingAdvice(JoinPoint joinPoint, Throwable error) {
		logger.debug("Method Name : " + joinPoint.getSignature().getName());
		logger.debug("Exception : " + error);
	}
}
