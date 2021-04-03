package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.KeyFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;


@WebServlet("/new-tutor")
public class NewTutorServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
    String fname = Jsoup.clean(request.getParameter("fname"), Whitelist.none());
    String lname = Jsoup.clean(request.getParameter("lname"), Whitelist.none());
    String mail = Jsoup.clean(request.getParameter("mail"), Whitelist.none());
    String phone = Jsoup.clean(request.getParameter("phone"), Whitelist.none());
    String zip = Jsoup.clean(request.getParameter("zip"), Whitelist.none());
    long timestamp = System.currentTimeMillis();

    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    KeyFactory keyFactory = datastore.newKeyFactory().setKind("Task");
    FullEntity taskEntity =
        Entity.newBuilder(keyFactory.newKey())
            .set("fname", fname)
            .set("lname", lname)
            .set("mail", mail)
            .set("phone", phone)
            .set("zip", zip)
            .set("timestamp", timestamp)
            .build();
    datastore.put(taskEntity);

    response.sendRedirect("/sign-up.html");
  }
}
