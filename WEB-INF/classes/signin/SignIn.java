package signin;

import java.io.*;
import java.util.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

public class SignIn extends HttpServlet {

  protected void doGet(HttpServletRequest request,
  HttpServletResponse response) throws ServletException, IOException {
      Date date = new Date();
      response.setContentType("text/html; charset=UTF-8");
      response.setCharacterEncoding("UTF-8");
      PrintWriter out = response.getWriter();
      out.println(read_into_string("/static/signup.html"));
      response.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
      response.setHeader("Cross-Origin-Opener-Policy", "same-origin");

  }

  private String read_into_string(String f_name){
      String f_text = "";
      try{

          final ServletContext servletContext = getServletContext();
          String bad_dir = servletContext.getRealPath(servletContext.getContextPath());
          bad_dir = bad_dir.substring(0, bad_dir.lastIndexOf("/"));
          System.out.printf("[CORSFilter] read path: %s\n", bad_dir+f_name);

          Scanner s = new Scanner(new File(bad_dir+f_name));
          while(s.hasNextLine()){
              f_text=f_text+s.next()+" ";
          }
      }
      catch (Exception e){
          System.out.println("[CORSFilter] Reading file failure!");
      }
      return f_text;
  }
}