package com.stackroute.keepnote.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exception.CategoryDoesNoteExistsException;
import com.stackroute.keepnote.exception.CategoryNotCreatedException;
import com.stackroute.keepnote.exception.CategoryNotFoundException;
import com.stackroute.keepnote.model.Category;
import com.stackroute.keepnote.repository.CategoryRepository;

/*
* Service classes are used here to implement additional business logic/validation 
* This class has to be annotated with @Service annotation.
* @Service - It is a specialization of the component annotation. It doesn't currently 
* provide any additional behavior over the @Component annotation, but it's a good idea 
* to use @Service over @Component in service-layer classes because it specifies intent 
* better. Additionally, tool support and additional behavior might rely on it in the 
* future.
* */
@Service
public class CategoryServiceImpl implements CategoryService {

	/*
	 * Autowiring should be implemented for the CategoryRepository. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */

	@Autowired
	private CategoryRepository repository;

	public CategoryServiceImpl(CategoryRepository repository) {
		this.repository = repository;
	}

	/*
	 * This method should be used to save a new category.Call the corresponding
	 * method of Respository interface.
	 */
	public Category createCategory(Category category) throws CategoryNotCreatedException {
		boolean categoryExisted = repository.existsById(category.getCategoryId());
		if (categoryExisted) {
			throw new CategoryNotCreatedException("category already exists");
		} else {
			category.setCategoryCreationDate(new Date());
			Category newCategory = repository.insert(category);
			if (newCategory == null) {
				throw new CategoryNotCreatedException("category not created");
			}
			return category;
		}
	}

	/*
	 * This method should be used to delete an existing category.Call the
	 * corresponding method of Respository interface.
	 */
	public boolean deleteCategory(String categoryId) throws CategoryDoesNoteExistsException {

		Optional<Category> findCategory = repository.findById(categoryId);
		if (!findCategory.isPresent()) {
			throw new CategoryDoesNoteExistsException("category not  exists");
		} else {
			repository.deleteById(categoryId);
			return true;
		}
	}

	/*
	 * This method should be used to update a existing category.Call the
	 * corresponding method of Respository interface.
	 */
	public Category updateCategory(Category category, String categoryId) {
		try {
			Category existingCategory = getCategoryById(categoryId);
			category.setCategoryCreatedBy(existingCategory.getCategoryCreatedBy());
			category.setCategoryCreatedBy(existingCategory.getCategoryCreatedBy());
			repository.delete(existingCategory);
			repository.insert(category);
		} catch (CategoryNotFoundException e) {
			return null;
		}
		return category;

	}

	/*
	 * This method should be used to get a category by categoryId.Call the
	 * corresponding method of Respository interface.
	 */
	public Category getCategoryById(String categoryId) throws CategoryNotFoundException {

		try {
			return repository.findById(categoryId).get();
		} catch (Exception e) {
			throw new CategoryNotFoundException("category not there");
		}
	}

	/*
	 * This method should be used to get a category by userId.Call the corresponding
	 * method of Respository interface.
	 */
	public List<Category> getAllCategoryByUserId(String userId) {
		List<Category> categoryList = repository.findAllCategoryByCategoryCreatedBy(userId);
		return categoryList;
	}

}
