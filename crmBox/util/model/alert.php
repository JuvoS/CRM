<?php
	
	public function alertField(){
		//添加列
		//ALTER TABLE table_name ADD column_name datatype
		//alter table t2 add d timestamp;
		//alter table infos add ex tinyint not null default '0';
		//删除列
		//ALTER TABLE table_name DROP COLUMN column_name
		//alter table t2 drop column c;
		//重命名列
		//alter table t1 change a b integer;
		//改变表中列的数据类型
		//ALTER TABLE table_name ALTER COLUMN column_name datatype
		//alter table t1 change b b bigint not null;
		//alter table infos change list list tinyint not null default '0';
		//重命名表
		//alter table t1 rename t2;
		var sql = 'ALTER TABLE Persons ADD Birthday date'
	}
?>