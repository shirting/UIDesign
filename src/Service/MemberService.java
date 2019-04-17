package Service;

import Entity.Member;
import java.util.ArrayList;

public interface  MemberService {
    public Member GetMemberAddress(String name,int id) throws Exception;
    public String EditMemberInfo(int id,String name,String password,String phone,String email,String account)throws Exception;
    public String EditMemberAddress(int id,String name,String[] Address)throws Exception;
    public String DeleteMember(int id,String name)throws Exception;
    public Member getmemberinfo(int id) throws Exception;
    //花费前八的会员
    public ArrayList<Member> GetMemberInfo()throws Exception;
}
