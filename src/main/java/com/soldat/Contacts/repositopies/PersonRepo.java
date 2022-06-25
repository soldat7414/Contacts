package com.soldat.Contacts.repositopies;

import com.soldat.Contacts.entities.PersonEntity;
import org.springframework.context.annotation.Scope;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Ihor Soldatenko
 * @date 24.06.2022
 */


@Scope("singleton")
public interface PersonRepo extends CrudRepository<PersonEntity, Long> {

    Optional<PersonEntity> findByName (String name);

}
