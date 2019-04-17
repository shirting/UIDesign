package Servlet;

import Service.DiscountService;
import ServiceImpl.DiscountServiceImpl;
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
@WebServlet("/AddDiscountServlet")
public class AddDiscountServlet extends HttpServlet {
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddDiscountServlet() {
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
        String FullPrice=request.getParameter("FullPrice");
        String MinusPrice=request.getParameter("MinusPrice");
        String chaptcha=request.getParameter("chaptcha");
        ArrayList<String> Result=new ArrayList<>();
        DiscountService discountService=new DiscountServiceImpl();
        try {
            Result=discountService.AddRestaurantDiscount(FullPrice,MinusPrice,chaptcha);
            PrintWriter write = response.getWriter();
            Gson gson=new Gson();
            String str=gson.toJson(Result);
            //System.out.println(str);
            write.write(str); // 将结果返回到前端页
            write.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
