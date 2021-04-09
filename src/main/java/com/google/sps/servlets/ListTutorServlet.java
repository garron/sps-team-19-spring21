package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StructuredQuery.OrderBy;
import com.google.gson.Gson;
import com.google.sps.data.Task;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for listing tasks. */
@WebServlet("/list-tutors")
public class ListTutorServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        Query<Entity> query = Query.newEntityQueryBuilder().setKind("Task").setOrderBy(OrderBy.asc("timestamp")).build();
        QueryResults<Entity> results = datastore.run(query);

        List<Task> tasks = new ArrayList<>();
        while (results.hasNext()) {
            Entity entity = results.next();

            long id = entity.getKey().getId();
            String fname = entity.getString("fname");
            String lname = entity.getString("lname");
            String mail = entity.getString("mail");
            String phone = entity.getString("phone");
            String address = entity.getString("address");
            long timestamp = entity.getLong("timestamp");

            Task task = new Task(id, fname, lname, mail, phone, address, timestamp);
            tasks.add(task);
        }

        Gson gson = new Gson();

        response.setContentType("application/json;");
        response.getWriter().println(gson.toJson(tasks));
    }
}
