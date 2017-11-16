<?php
header("Access-Control-Allow-Origin: *");

	$mysql_server_name='101.200.44.93'; //改成自己的mysql数据库服务器
	$mysql_username='root'; //改成自己的mysql数据库用户名 
	$mysql_password='sliverTree@2017'; //改成自己的mysql数据库密码 
	$mysql_database='ComeDb'; //改成自己的mysql数据库名
	$conn=mysql_connect($mysql_server_name,$mysql_username,$mysql_password) or die("error connecting") ; //连接数据库
	 
	mysql_query("set names 'utf8'"); //数据库输出编码 应该与你的数据库编码保持一致.南昌网站建设公司百恒网络PHP工程师建议用UTF-8 国际标准编码.
	mysql_select_db($mysql_database); //打开数据库
	$sql ="select * from sys_users "; //SQL语句
	 
	$result = mysql_query($sql,$conn); //查询
//	var_dump($result);
	$arr = array();
	$i=0;
	while($row = mysql_fetch_array($result))
	 
	{
	 
//	echo "<div style=\"height:24px; line-height:24px; font-weight:bold;\">"; //排版代码
	$arr[$i] = $row;
	$i++; 
	 
//	echo $row['username'] . "<br/>";
//	 
//	echo "</div>"; //排版代码
	 
	}
	mysql_close($con);
	
	echo json_encode($arr);
	exit;
	
//	return $result;
?>