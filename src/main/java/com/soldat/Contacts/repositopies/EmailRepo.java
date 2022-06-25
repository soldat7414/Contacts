package com.soldat.Contacts.repositopies;

import com.soldat.Contacts.entities.EmailEntity;
import com.soldat.Contacts.entities.PersonEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * @author Ihor Soldatenko
 * @date 25.06.2022
 */

public interface EmailRepo extends CrudRepository<EmailEntity, Long> {

    Optional<EmailEntity> findByEmail (String email);
    Iterable<EmailEntity> findByPersonEntity (PersonEntity personEntity);
}
