package com.soldat.Contacts.services;

import com.soldat.Contacts.entities.EmailEntity;
import com.soldat.Contacts.entities.models.Email;
import com.soldat.Contacts.exceptions.AlreadyExistException;
import com.soldat.Contacts.exceptions.NotFoundException;
import com.soldat.Contacts.repositopies.EmailRepo;
import com.soldat.Contacts.repositopies.PersonRepo;
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
public class EmailService {

    private final EmailRepo repo;
    private final PersonRepo personRepo;

    public EmailService(EmailRepo repo, PersonRepo personRepo) {
        this.repo = repo;
        this.personRepo = personRepo;
    }

    @Transactional
    public Email add (EmailEntity emailEntity, long personId) throws AlreadyExistException, NotFoundException{
        Optional<EmailEntity> emailInDb = repo.findByEmail(emailEntity.getEmail());
        if(emailInDb.isPresent()) throw new AlreadyExistException("EmailEntity with same name is already exist in DB.",
                emailInDb.get().getId());
        emailEntity.setPersonEntity(personRepo.findById(personId).orElseThrow(
                () -> new NotFoundException("PersonEntity with given id has not found")));
        return repo.save(emailEntity).toModel();
    }

//    @Transactional
//    public List<EmailEntity> getAll (){
//        Iterable<EmailEntity> people = repo.findAll();
//        List<EmailEntity> all = new ArrayList<>();
//        people.forEach(all::add);
//        return all;
//    }

    @Transactional
    public List<Email> getByPerson (long personId) throws NotFoundException{
        Iterable<EmailEntity> people = repo.findByPersonEntity(
                personRepo.findById(personId).orElseThrow(
                        () -> new NotFoundException("PersonEntity with given id has not found")));
        List<EmailEntity> all = new ArrayList<>();
        people.forEach(all::add);
        return Email.toModelList(all);
    }

    @Transactional
    public Email getById(long id) throws NotFoundException{
        Optional<EmailEntity> emailInDb = repo.findById(id);
        return emailInDb.orElseThrow(
                () -> new NotFoundException("EmailEntity with given id has not found")).toModel();
    }

    @Transactional
    public Email edit (long id, EmailEntity emailEntity) throws NotFoundException{
        EmailEntity emailEntityInDb = repo.findById(id).orElseThrow(
                () -> new NotFoundException("EmailEntity with given id has not found"));
        if(emailEntity.getEmail() != null) emailEntityInDb.setEmail(emailEntity.getEmail());
        if(emailEntity.getPersonEntity() != null) emailEntityInDb.setPersonEntity(emailEntity.getPersonEntity());
        return repo.save(emailEntityInDb).toModel();
    }

    @Transactional
    public long delete (long id) throws NotFoundException{
       EmailEntity emailEntity = repo.findById(id).orElseThrow(
               () -> new NotFoundException("EmailEntity with given id has not found"));
        repo.delete(emailEntity);
        return emailEntity.getId();
    }
}
