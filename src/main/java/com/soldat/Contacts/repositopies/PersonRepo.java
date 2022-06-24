package com.soldat.Contacts.repositopies;

import com.soldat.Contacts.entities.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Ihor Soldatenko
 * @date 24.06.2022
 */

public interface PersonRepo extends CrudRepository<Person, Long> {

}
