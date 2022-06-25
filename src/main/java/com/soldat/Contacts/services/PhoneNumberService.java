package com.soldat.Contacts.services;

import com.soldat.Contacts.entities.PhoneNumberEntity;
import com.soldat.Contacts.entities.models.PhoneNumber;
import com.soldat.Contacts.exceptions.AlreadyExistException;
import com.soldat.Contacts.exceptions.NotFoundException;
import com.soldat.Contacts.repositopies.PersonRepo;
import com.soldat.Contacts.repositopies.PhoneNumberRepo;
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
public class PhoneNumberService {

    private final PhoneNumberRepo repo;
    private final PersonRepo personRepo;

    public PhoneNumberService(PhoneNumberRepo repo, PersonRepo personRepo) {
        this.repo = repo;
        this.personRepo = personRepo;
    }

    @Transactional
    public PhoneNumber add (PhoneNumberEntity phoneNumberEntity, long personId) throws AlreadyExistException, NotFoundException{
        Optional<PhoneNumberEntity> phoneNumberInDb = repo.findByPhoneNumber(phoneNumberEntity.getPhoneNumber());
        if(phoneNumberInDb.isPresent()) throw new AlreadyExistException("Same phoneNumberEntity is already exists in DB.",
                phoneNumberInDb.get().getId());
        phoneNumberEntity.setPersonEntity(personRepo.findById(personId).orElseThrow(
                () -> new NotFoundException("PersonEntity with given id has not found")));
        return repo.save(phoneNumberEntity).toModel();
    }

//    @Transactional
//    public List<PhoneNumber> getAll (){
//        Iterable<PhoneNumberEntity> people = repo.findAll();
//        List<PhoneNumberEntity> all = new ArrayList<>();
//        people.forEach(all::add);
//        return PhoneNumber.toModelList(all);
//    }

    @Transactional
    public List<PhoneNumber> getByPerson (long personId) throws NotFoundException{
        Iterable<PhoneNumberEntity> people = repo.findByPersonEntity(personRepo.findById(personId).orElseThrow(
                () -> new NotFoundException("PersonEntity with given id has not found")));
        List<PhoneNumberEntity> all = new ArrayList<>();
        people.forEach(all::add);
        return PhoneNumber.toModelList(all);
    }

    @Transactional
    public PhoneNumber getById(long id) throws NotFoundException{
        Optional<PhoneNumberEntity> phoneNumberInDb = repo.findById(id);
        return phoneNumberInDb.orElseThrow(
                () -> new NotFoundException("PhoneNumberEntity with given id has not found")).toModel();
    }

    @Transactional
    public PhoneNumber edit (long id, PhoneNumberEntity phoneNumberEntity) throws NotFoundException{
        PhoneNumberEntity phoneNumberEntityInDb = repo.findById(id).orElseThrow(
                () -> new NotFoundException("PhoneNumberEntity with given id has not found"));
        if(phoneNumberEntity.getPhoneNumber() != null) phoneNumberEntityInDb.setPhoneNumber(phoneNumberEntity.getPhoneNumber());
        if(phoneNumberEntity.getPersonEntity() != null) phoneNumberEntityInDb.setPersonEntity(phoneNumberEntity.getPersonEntity());
        return repo.save(phoneNumberEntityInDb).toModel();
    }

    @Transactional
    public long delete (long id) throws NotFoundException{
       PhoneNumberEntity phoneNumberEntity = repo.findById(id).orElseThrow(
               () -> new NotFoundException("PhoneNumberEntity with given id has not found"));
        repo.delete(phoneNumberEntity);
        return phoneNumberEntity.getId();
    }
}
