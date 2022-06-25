package com.soldat.Contacts.repositopies;

import com.soldat.Contacts.entities.PersonEntity;
import com.soldat.Contacts.entities.PhoneNumberEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * @author Ihor Soldatenko
 * @date 25.06.2022
 */

public interface PhoneNumberRepo extends CrudRepository<PhoneNumberEntity, Long> {

    Optional<PhoneNumberEntity> findByPhoneNumber (String phoneNumber);
    Iterable<PhoneNumberEntity> findByPersonEntity (PersonEntity personEntity);
}
