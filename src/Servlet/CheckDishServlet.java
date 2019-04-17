package Servlet;

import Entity.Dish;
import Service.DiscountService;
import Service.YummyService;
import ServiceImpl.DiscountServiceImpl;
import ServiceImpl.YummyServiceImpl;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

/**
 * Servlet implementation class MemberAddressServlet
 */
@WebServlet("/CheckDishServlet")
public class CheckDishServlet extends HttpServlet {
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CheckDishServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=utf-8");
        request.setCharacterEncoding("UTF-8");
        ArrayList<Dish> dishes=new ArrayList<>();
        YummyService yummyService=new YummyServiceImpl();
        try {
            dishes=yummyService.CheckDish();
            PrintWriter write = response.getWriter();
            Gson gson=new Gson();
            String str=gson.toJson(dishes);
            //System.out.println(str);
            write.write(str); // 将结果返回到前端页
            write.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
