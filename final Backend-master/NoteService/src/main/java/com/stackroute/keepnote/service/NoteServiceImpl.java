package com.stackroute.keepnote.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exception.NoteNotFoundExeption;
import com.stackroute.keepnote.model.Note;
import com.stackroute.keepnote.model.NoteUser;
import com.stackroute.keepnote.repository.NoteRepository;

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
public class NoteServiceImpl implements NoteService{

	/*
	 * Autowiring should be implemented for the NoteRepository and MongoOperation.
	 * (Use Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */
	private static final Logger logger = org.slf4j.LoggerFactory.getLogger(NoteService.class);
	
	@Autowired
	private NoteRepository noteRepository;

	public NoteServiceImpl(NoteRepository noteRepository) {
		this.noteRepository = noteRepository;
	}

	@Override
	public boolean createNote(Note note) {
		
		//note.set
		logger.info("Inside createNote "+note.getNoteContent());
		int count = 1;
		System.out.println("ategory"+note.getCategory().getCategoryCreatedBy());
		System.out.println(note.getCategory());

		NoteUser noteUser = new NoteUser();
		List<Note> notes = new ArrayList<>();
		note.setNoteCreationDate(new Date());
		if (noteRepository.existsById(note.getNoteCreatedBy())) {
			logger.info("Inside if getNoteCreatedBy "+note.getNoteCreatedBy());
			notes = noteRepository.findById(note.getNoteCreatedBy()).get().getNotes();
			Iterator iterator = notes.iterator();
			Note note1 = new Note();
			while (iterator.hasNext()) {

				note1 = (Note) iterator.next();
			}
			note.setNoteId(note1.getNoteId() + count);
			notes.add(note);
			noteUser.setUserId(note.getNoteCreatedBy());
			noteUser.setNotes(notes);
			if (noteRepository.save(noteUser) != null) {
				logger.info("Inside save "+note.getNoteTitle());
				return true;
			}
			logger.info("Inside  ");
		} else { 
			logger.info("Inside else "+note.getNoteTitle());
			note.setNoteId(count);
			notes.add(note);
			noteUser.setUserId(note.getNoteCreatedBy());
			noteUser.setNotes(notes);

			if (noteRepository.insert(noteUser) != null) {
				logger.info("Inside insert "+note.getNoteTitle());
				return true;
			}
		}
		return false;
	}

	// Delete Single Note
	@Override
	public boolean deleteNote(String userId, int noteId) {
		NoteUser noteUser = new NoteUser();
		List<Note> notes = noteRepository.findById(userId).get().getNotes();

		if (!notes.isEmpty()) {
			Iterator iterator = notes.listIterator();
			while (iterator.hasNext()) {
				Note note = (Note) iterator.next();
				if (note.getNoteId() == noteId)
					iterator.remove();

			}
			noteUser.setUserId(userId);
			noteUser.setNotes(notes);
			noteRepository.save(noteUser);
			return true;
		}

		return false;
	}

	@Override
	public boolean deleteAllNotes(String userId) throws NoteNotFoundExeption {
		NoteUser noteUser = new NoteUser();
		try {
			List<Note> notes = noteRepository.findById(userId).get().getNotes();
			if (notes != null) {

				Iterator iterator = notes.listIterator();
				while (iterator.hasNext()) {
					iterator.next();
					iterator.remove();

				}
				noteUser.setUserId(userId);
				noteUser.setNotes(notes);
				noteRepository.save(noteUser);
				return true;

			}

		} catch (NoSuchElementException exception) {

			throw new NoteNotFoundExeption("Note not found");
		}

		return false;
	}

	@Override
	public Note updateNote(Note note, int noteId, String userId) throws NoteNotFoundExeption {

		Note existingNote = null;
		NoteUser noteUser = new NoteUser();
		try {
			List<Note> notes = noteRepository.findById(userId).get().getNotes();
			if (!notes.isEmpty()) {
				for (Note tempNote : notes) {
					existingNote = tempNote;
					if (existingNote.getNoteId() == noteId) {
						existingNote.setNoteId(existingNote.getNoteId());
						existingNote.setNoteTitle(note.getNoteTitle());
						existingNote.setNoteContent(note.getNoteContent());
						existingNote.setNoteCreationDate(existingNote.getNoteCreationDate());
						existingNote.setNoteCreatedBy(userId);
						existingNote.setCategory(note.getCategory());
						existingNote.setReminders(note.getReminders());
						existingNote.setNoteStatus(note.getNoteStatus());
						break;
					}
				}

				if (existingNote.getNoteId() != noteId) {
					throw new NoteNotFoundExeption("Note does not exists");
				} else {
					noteUser.setUserId(userId);
					noteUser.setNotes(notes);
					noteRepository.save(noteUser);
				}
			}

		} catch (NoSuchElementException exception) {
			throw new NoteNotFoundExeption("Note does not exists");
		}
		return existingNote;
	}

	@Override
	public Note getNoteByNoteId(String userId, int noteId) throws NoteNotFoundExeption {

		Note existingNote = new Note();
		try {
			List<Note> notes = noteRepository.findById(userId).get().getNotes();
			for (Note note : notes) {
				existingNote = note;
				if (existingNote.getNoteId() == noteId)
					break;
			}
			if (existingNote.getNoteId() != noteId) {
				throw new NoteNotFoundExeption("Note does not exists");
			}

		} catch (NoSuchElementException exception) {
			throw new NoteNotFoundExeption("Note Does not exists");
		}

		return existingNote;
	}

	/*
	 * This method should be used to get all notes with specific userId.
	 */
	public List<Note> getAllNoteByUserId(String userId) {
		
		return noteRepository.findById(userId).get().getNotes();
	}

}
