package Servlet;

import Service.RestaurantService;
import ServiceImpl.RestaurantServiceImpl;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Servlet implementation class MemberAddressServlet
 */
@WebServlet("/EditRestaurantInfoServlet")
public class EditRestaurantInfoServlet extends HttpServlet {

    /**
     * @see HttpServlet#HttpServlet()
     */
    public EditRestaurantInfoServlet() {
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
        String name,phone,type,address,chaptcha;
        String result;
        name=request.getParameter("name");
        phone=request.getParameter("phone");
        type=request.getParameter("type");
        address=request.getParameter("address");
        chaptcha=request.getParameter("chaptcha");
        RestaurantService restaurantService=new RestaurantServiceImpl();
        try {
            result=restaurantService.EditRestaurantInfo(chaptcha,name,phone,type,address);
            PrintWriter write = response.getWriter();
            Gson gson=new Gson();
            String str=gson.toJson(result);
            System.out.println(str);
            write.write(str); // 将结果返回到前端页
            write.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
