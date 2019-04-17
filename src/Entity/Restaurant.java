package Entity;


import java.io.Serializable;
import java.util.ArrayList;

public class Restaurant implements Serializable{
    //餐厅名、餐厅ID、地址、店铺类型、编码、优惠、菜品（价格、数量、种类、套餐）、餐厅电话、当前订单、历史订单、餐厅申请住的的审批状态
    String resName;
    int resId;
    int eidtid;
    String resaccount;
    String resAddress;
    String chaptcha;
    String restype;
    String phone;
    ArrayList<Dish> dishes=new ArrayList<Dish>();
    ArrayList<Discount> discount=new ArrayList<Discount>();
    int rescount;

    public ArrayList<Discount> getDiscount() {
        return discount;
    }

    public ArrayList<Dish> getDishes() {
        return dishes;
    }

    public int getResId() {
        return resId;
    }

    public String getChaptcha() {
        return chaptcha;
    }

    public String getPhone() {
        return phone;
    }

    public String getResaccount() {
        return resaccount;
    }

    public String getResAddress() {
        return resAddress;
    }

    public String getResName() {
        return resName;
    }

    public String getRestype() {
        return restype;
    }

    public void setChaptcha(String chaptcha) {
        this.chaptcha = chaptcha;
    }

    public void setDiscount(ArrayList<Discount> discount) {
        this.discount = discount;
    }

    public void setDishes(ArrayList<Dish> dishes) {
        this.dishes = dishes;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setResaccount(String resaccount) {
        this.resaccount = resaccount;
    }

    public void setResAddress(String resAddress) {
        this.resAddress = resAddress;
    }

    public void setResId(int resId) {
        this.resId = resId;
    }

    public void setRestype(String restype) {
        this.restype = restype;
    }

    public void setResName(String resName) {
        this.resName = resName;
    }

    public void setEidtid(int eidtid) {
        this.eidtid = eidtid;
    }

    public int getEidtid() {
        return eidtid;
    }

    public int getRescount() {
        return rescount;
    }

    public void setRescount(int rescount) {
        this.rescount = rescount;
    }
}
