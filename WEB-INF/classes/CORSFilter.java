package com;

import javax.servlet.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CORSFilter extends HttpServlet {

protected void doGet(HttpServletRequest request,
HttpServletResponse response) throws ServletException, IOException {
Date date = new Date();
response.setContentType("text/html");
PrintWriter out = response.getWriter();
out.println("<html><body>");
out.println("<b>Current Date: </b>"+ date);
out.println("</body></html>");
// response.setHeader("Refresh", "10");
response.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
}

}