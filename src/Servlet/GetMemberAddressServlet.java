package Servlet;

import Entity.Member;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import Service.MemberService;
import ServiceImpl.MemberServiceImpl;
import com.google.gson.Gson;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

/**
 * Servlet implementation class MemberAddressServlet
 */
@WebServlet("/GetMemberAddressServlet")
public class GetMemberAddressServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetMemberAddressServlet() {
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
        String name;
        int id;
        ArrayList<String> address;
        Member member;
        member = new Member();
        name=request.getParameter("membername");
        id=Integer.parseInt(request.getParameter("memberid"));
        System.out.println(name+"~"+id);
        MemberService memberservice=new MemberServiceImpl();
        try {
            member=memberservice.GetMemberAddress(name,id);
            System.out.println(member.getMemberAddress());
            PrintWriter write = response.getWriter();
            Gson gson=new Gson();
            String str=gson.toJson(member);
            //System.out.println(str);
            write.write(str); // 将结果返回到前端页
            write.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
