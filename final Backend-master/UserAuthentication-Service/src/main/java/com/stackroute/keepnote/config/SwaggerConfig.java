package com.stackroute.keepnote.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/*As in this class we are implementing Swagger So annotate the class with @Configuration and 
 * @EnableSwagger2
 * 
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {


	

	    /** The Constant API_NAME. */
	    private static final String API_NAME     = "User Authentication Service API";

	    /** The Constant PACKAGE_SCAN. */
	    private static final String PACKAGE_SCAN = "com.stackroute.keepnote.controller";

		/*
		 * Annotate this method with @Bean . This method will return an Object of Docket.
		 * This method will implement logic for swagger
		 */
	    @Bean
	    public Docket productApi() {
	    	Docket dockent = new Docket(DocumentationType.SWAGGER_2)
	    			.select().
	    			apis(RequestHandlerSelectors.
	    					basePackage("com.stackroute.keepnote.controller"))
	    			.paths(PathSelectors.any()).build();
	    	return dockent;
	    	
	    	
	    	
	    	
			/*
			 * return new Docket(DocumentationType.SWAGGER_2).groupName(API_NAME).select()
			 * .apis(RequestHandlerSelectors.basePackage(PACKAGE_SCAN)).paths(PathSelectors.
			 * any()).build()
			 * .useDefaultResponseMessages(false).securitySchemes(Collections.singletonList(
			 * apiKey())) .securityContexts(Collections.singletonList(securityContext()));
			 */   }

	  /*  private ApiKey apiKey()
	    {
	        return new ApiKey("Authorization", "Authorization", "header");
	    }

	    private SecurityContext securityContext()
	    {
	        return SecurityContext.builder().securityReferences(defaultAuth()).forPaths(PathSelectors.any()).build();
	    }

	    private List<SecurityReference> defaultAuth()
	    {
	        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
	        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
	        authorizationScopes[0] = authorizationScope;
	        return Arrays.asList(new SecurityReference("Authorization", authorizationScopes));
	    }
		*/



}
