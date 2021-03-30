
package com.google.sps.data;

/** An item on a todo list. */
public final class Task {

  private final long id;
  private final String fname;
  private final String lname;
  private final String mail;
  private final String phone;
  private final String zip;
  private final long timestamp;

  public Task(long id, String fname, String lname, String mail, String phone, String zip,  long timestamp) {
    this.id = id;
    this.fname = fname;
    this.lname = lname;
    this.mail = mail;
    this.phone = phone;
    this.zip = zip;
    this.timestamp = timestamp;
  }
}