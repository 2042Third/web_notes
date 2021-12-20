package storage;
import java.util.prefs.*;
import java.net.URLDecoder;
import java.sql.*;
import javax.servlet.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Scanner;
import java.io.File;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DataStart extends HttpServlet {

    protected void doGet(HttpServletRequest request,
    HttpServletResponse response) {
        Date date = new Date();
        // Preferences node = Preferences.userNodeForPackage(this.getClass());
        String url = "jdbc:mariadb://localhost:3306/pdmdata?useSSL=false";
        try{
            Connection con = DriverManager.getConnection(url, "pdm-note", "56e80dd0b396bb9e26ee41efde5fdfd5518a400c9ffea101ff879feb6af623b8");
            String query = "create or replace table pdmdata.notetest;";
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