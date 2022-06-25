package com.soldat.Contacts.exceptions;

/**
 * @author Ihor Soldatenko
 * @date 25.06.2022
 */

public class AlreadyExistException extends Exception {

    public AlreadyExistException(String message, long id) {
        super(message);
        this.id = id;
    }

    private long id;

    public long getId() {
        return id;
    }
}
