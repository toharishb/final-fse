package com.stackroute.keepnote.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exception.ReminderNotCreatedException;
import com.stackroute.keepnote.exception.ReminderNotFoundException;
import com.stackroute.keepnote.model.Reminder;
import com.stackroute.keepnote.repository.ReminderRepository;

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
public class ReminderServiceImpl implements ReminderService {

	/*
	 * Autowiring should be implemented for the ReminderRepository. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */
	@Autowired
	private ReminderRepository repository;

	/*
	 * This method should be used to save a new reminder.Call the corresponding
	 * method of Respository interface.
	 */
	public Reminder createReminder(Reminder reminder) throws ReminderNotCreatedException {
		boolean reminderExisted = repository.existsById(reminder.getReminderId());
		if (reminderExisted) {
			throw new ReminderNotCreatedException("reminder already exists");
		} else {
			reminder.setReminderCreationDate(new Date());
			Reminder newUser = repository.insert(reminder);
			if (newUser == null) {
				throw new ReminderNotCreatedException("reminder not  exists");
			}
			return reminder;
		}
		/*reminder.setReminderCreationDate(new Date());
		Reminder newUser = repository.insert(reminder);
		return reminder;*/
	}

	public Reminder saveReminder(Reminder reminder) throws ReminderNotCreatedException {
		boolean reminderExisted = repository.existsById(reminder.getReminderId());
		if (reminderExisted) {
			throw new ReminderNotCreatedException("reminder already exists");
		} else {
			reminder.setReminderCreationDate(new Date());
			Reminder newUser = repository.save(reminder);
			if (newUser == null) {
				throw new ReminderNotCreatedException("reminder not  exists");
			}
			return reminder;
		}
	}

	/*
	 * This method should be used to delete an existing reminder.Call the
	 * corresponding method of Respository interface.
	 */
	public boolean deleteReminder(String reminderId) throws ReminderNotFoundException {

		Optional<Reminder> findReminder = repository.findById(reminderId);
		if (!findReminder.isPresent()) {
			throw new ReminderNotFoundException("remnder not  exists");
		} else {
			repository.deleteById(reminderId);
			return true;
		}
	}

	/*
	 * This method should be used to update a existing reminder.Call the
	 * corresponding method of Respository interface.
	 */
	public Reminder updateReminder(Reminder reminder, String reminderId) throws ReminderNotFoundException {
		try {
			Reminder existingReminder = getReminderById(reminderId);
			reminder.setReminderCreatedBy(existingReminder.getReminderCreatedBy());
			repository.delete(existingReminder);
			repository.insert(reminder);
		} catch (ReminderNotFoundException e) {
			return null;
		}
		return reminder;
	}

	/*
	 * This method should be used to get a reminder by reminderId.Call the
	 * corresponding method of Respository interface.
	 */
	public Reminder getReminderById(String reminderId) throws ReminderNotFoundException {
		try {
			return repository.findById(reminderId).get();
		} catch (Exception e) {
			throw new ReminderNotFoundException("reminder not there");
		}
	}

	/*
	 * This method should be used to get all reminders. Call the corresponding
	 * method of Respository interface.
	 */

	public List<Reminder> getAllReminders() {

		return repository.findAll();
	}
	
	public List<Reminder> getAllReminderByUserId(String userId) {
		List<Reminder> reminderList = repository.findAllReminderByReminderCreatedBy(userId);
		return reminderList;
	}

}
