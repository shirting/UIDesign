package Dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public interface DaoHelper 
{
	/*
	 * ��TOMCAT����Դ�õ����Ӷ���
	 */
	public Connection getConnection();
	
	/*
	 * �ر�Connection����,�����ݿ����ӷŻص����ӳ���
	 */
	public void closeConnection(Connection con);
	
	/*
	 * �ر�PreparedStatement����
	 */
	public void closePreparedStatement(PreparedStatement stmt);
	
	/*
	 * �ر�ResultSet����
	 */	
	public void closeResult(ResultSet result);
}
