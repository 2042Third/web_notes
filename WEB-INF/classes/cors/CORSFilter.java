package cors;

import jakarta.servlet.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

import util.SendMail;
import java.util.Scanner;
import java.io.File;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CORSFilter extends HttpServlet {

    protected void doGet(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
//        String locale_file_en = "/dist/pdm-notes/en-US/index.html";
//        String locale_file_zh = "/dist/pdm-notes/zh-CN/index.html";
        String locale_file_en = "/www/en-US/index.html";
        String locale_file_zh = "/www/zh-CN/index.html";
        String locale_file = locale_file_en;
        String requestlocale = "en";
        String url = request.getRequestURL().toString();
        String parameters = request.getQueryString();
        if (parameters != null && !parameters.isEmpty()) {
            Map<String, String> parameterMap = splitQuery(parameters);
            if (parameterMap.containsKey("locale")) {
                requestlocale = parameterMap.get("locale");
            }
        } else {
            System.out.printf("[CORSFilter] request redirect \"%s\"\n", url + "?locale=" + requestlocale);
            response.sendRedirect(url + "?locale=" + requestlocale);
        }
        // setAttribute("locale", requestlocale);
        System.out.printf("[CORSFilter] request locale \"%s\"\n", requestlocale);

        if (requestlocale.equals("en")) {
            System.out.printf("[CORSFilter] default locale: english selected\n");
            locale_file = locale_file_en;
        } else if (requestlocale.equals("cn")) {
            System.out.printf("[CORSFilter] Chinese locale: chinese selected\n");
            locale_file = locale_file_zh;
        }

        Date date = new Date();
        response.setContentType("text/html; charset=UTF-8");
        // response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.println(read_into_string(locale_file));
        response.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
        response.setHeader("Cross-Origin-Opener-Policy", "same-origin");

    }

    public static Map<String, String> splitQuery(String query) throws UnsupportedEncodingException {
        Map<String, String> query_pairs = new LinkedHashMap<String, String>();
        String[] pairs = query.split("&");
        for (String pair : pairs) {
            System.out.println(pair);
            int idx = pair.indexOf("=");
            query_pairs.put(URLDecoder.decode(pair.substring(0, idx), "UTF-8"),
                    URLDecoder.decode(pair.substring(idx + 1), "UTF-8"));
        }
        return query_pairs;
    }

    private String read_into_string(String f_name) {
        String f_text = "";
        try {

            final ServletContext servletContext = getServletContext();
            String bad_dir = servletContext.getRealPath(servletContext.getContextPath());
            bad_dir = bad_dir.substring(0, bad_dir.lastIndexOf("/"));
            System.out.printf("[CORSFilter] read path: %s\n", bad_dir + f_name);

            Scanner s = new Scanner(new File(bad_dir + f_name));
            while (s.hasNextLine()) {
                f_text = f_text + s.next() + " ";
            }
        } catch (Exception e) {
            System.out.println("[CORSFilter] Reading file failure!");
        }
        return f_text;
    }

}