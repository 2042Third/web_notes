package storage;
import java.util.prefs.*;
import java.net.URLDecoder;
import java.sql.*;
import jakarta.servlet.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Scanner;
import java.io.File;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class DataStart extends HttpServlet {

    protected void doGet(HttpServletRequest request,
    HttpServletResponse response) {
        Date date = new Date();
        // Preferences node = Preferences.userNodeForPackage(this.getClass());
        try{
            Class.forName("org.postgresql.Driver");
        }
        catch (Exception e){
            System.out.println("postgresql driver not found.");
        }
        String url = "jdbc:postgresql://localhost:5445/pdm";
        try{
            Connection con = DriverManager.getConnection(
                url, 
                "pdmsecurity", 
                "16a93646e026f05c4b497e14c921d6b9915263aaa64663039dba8f13181f15e3");
            String query = "INSERT INTO test_table(name, time, t1, t2) VALUES(?, ?, ?, ?)";
            PreparedStatement stat = con.prepareStatement(query);
            stat.setString(1, "test1");
            stat.setString(2, date.toString());
            stat.setString(3, "from test user pdmsecurity");
            stat.setString(4, "test1");
            ResultSet rs = stat.executeQuery();
            // query = "create table `notetest` (`name` VARCHAR(511) DEFAULT null,`data` VARCHAR(511) DEFAULT null,`cat1` VARCHAR(511) DEFAULT null,`cat2` VARCHAR(511) DEFAULT null);";
            // stat = con.prepareStatement(query);
            // rs = stat.executeQuery();
            System.out.println("[web_notes storage] success test1 for db");
        }
        catch (Exception e) {
            e.printStackTrace();
            System.out.println("Opening connection unsuccessful!");
        }
    }
}