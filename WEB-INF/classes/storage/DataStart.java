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
            Class.forName("org.mariadb.jdbc.Driver");
        }
        catch (Exception e){
            System.out.println("mariadb driver not found.");
        }
        String url = "jdbc:mysql://127.0.0.1:3306/pdmdata";
        try{
            Connection con = DriverManager.getConnection(
                url, 
                "pdm-note", 
                "56e80dd0b396bb9e26ee41efde5fdfd5518a400c9ffea101ff879feb6af623b8");
            String query = "create or replace table `notetest` (`name` VARCHAR(511) DEFAULT null,`data` VARCHAR(511) DEFAULT null,`cat1` VARCHAR(511) DEFAULT null,`cat2` VARCHAR(511) DEFAULT null);";
            PreparedStatement stat = con.prepareStatement(query);
            ResultSet rs = stat.executeQuery();
            System.out.println("[web_notes storage] created table pdmdata.notetest");
        }
        catch (Exception e) {
            e.printStackTrace();
            System.out.println("Opening connection unsuccessful!");
        }
    }
}