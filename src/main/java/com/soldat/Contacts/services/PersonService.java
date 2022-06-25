package com.soldat.Contacts.services;

import com.soldat.Contacts.entities.PersonEntity;
import com.soldat.Contacts.entities.models.Person;
import com.soldat.Contacts.exceptions.AlreadyExistException;
import com.soldat.Contacts.exceptions.NotFoundException;
import com.soldat.Contacts.repositopies.PersonRepo;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author Ihor Soldatenko
 * @date 25.06.2022
 */

@Service
@Scope("singleton")
public class PersonService {

    private final PersonRepo repo;

    public PersonService(PersonRepo repo) {
        this.repo = repo;
    }

    @Transactional
    public Person add(PersonEntity personEntity) throws AlreadyExistException {
        Optional<PersonEntity> personInDb = repo.findByName(personEntity.getName());
        if (personInDb.isPresent()) throw new AlreadyExistException(
                "PersonEntity with same name is already exist in DB.", personInDb.get().getId());
        return repo.save(personEntity).toModel();
    }

    @Transactional
    public List<Person> getAll() {
        Iterable<PersonEntity> people = repo.findAll();
        List<PersonEntity> all = new ArrayList<>();
        people.forEach(all::add);
        return Person.toModelList(all);
    }

    @Transactional
    public Person getById(long id) throws NotFoundException {
        Optional<PersonEntity> personInDb = repo.findById(id);
//        if(personInDb.get().getPhoneNumbers()!=null)personInDb.get().getPhoneNumbers().forEach(System.out::println);
        return personInDb.orElseThrow(
                () -> new NotFoundException("PersonEntity with given id has not found")).toModel();
    }

    @Transactional
    public Person edit(long id, PersonEntity personEntity) throws NotFoundException {
        PersonEntity personEntityInDb = repo.findById(id).orElseThrow(
                () -> new NotFoundException("PersonEntity with given id has not found"));
        if (personEntity.getName() != null) personEntityInDb.setName(personEntity.getName());
        if (personEntity.getNote() != null) personEntityInDb.setNote(personEntity.getNote());
        if (personEntity.getPhoneNumbers() != null) personEntityInDb.setPhoneNumbers(personEntity.getPhoneNumbers());
        if (personEntity.getEmails() != null) personEntityInDb.setEmails(personEntity.getEmails());
        return repo.save(personEntityInDb).toModel();
    }

    @Transactional
    public long delete(long id) throws NotFoundException {
        PersonEntity personEntity = repo.findById(id).orElseThrow(
                () -> new NotFoundException("PersonEntity with given id has not found"));
        repo.delete(personEntity);
        return personEntity.getId();
    }
}
