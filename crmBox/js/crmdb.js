function CrmDb(){
	this.db = openDatabase('stResources','1.0','resources db',1024*1024);
	this.dbArr = new Array();
	
	this.createData = function(sqlText){
		//'create table if not exists ResourceData(title TEXT,describe TEXT,keywords TEXT,url TEXT)'
		this.db.transaction(function (tx){
            tx.executeSql(sqlText,[],function(tx,res){
				console.log('right');
            },function(tx,err){
                alert(err.message)
            });
        })
	}
	
	this.saveData = function(dbName,arr,valueArr){
		var insertText = 'insert into '+dbName+' values(';
		for(var i=0;i<arr.length;i++){
			insertText += '?';
			if(i<arr.length-1){
				insertText += ',';
			}	
		}
		insertText += ')';

		this.db.transaction(function(tx){
	        tx.executeSql(insertText,valueArr,function(tx,rs){
	            alert('save success');
	        },
	        function (tx,err){
	            alert(err.source +'===='+err.message);
	        })
    	})
	}
	
	this.delAllData = function(dbName){
		this.db.transaction(function(tx){
            tx.executeSql('delete from '+dbName,[],function(tx,res){
                alert('delete All success');
            },function (tx,err){
                alert('delete Fail:'+err.message);
            })
        })
	}
	
	this.selectData = function(dbName){
		this.db.transaction(function(tx){
			tx.executeSql('select * from '+dbName,[],function(tx,result){
				for(var i = 0 ;i<result.rows.length;i++){
                    this.dbArr[i] = result.rows.item(i);
                }
            })
		});
	}
}
