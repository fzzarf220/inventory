// Code goes here
angular.module('app',[])
.controller('ctrl',function($scope){
  $scope.title='Inventory system';
  $scope.options={
     decimals:2
    ,nameConventions:["uppercase","lowercase"]
    ,nameConvention:"lowercase"
    ,locations:['ny','nj','pa']
  };
  $scope.columns=[
     'action'
    ,'name'
    ,'sku'
    ,'locations'
    ,'price'
  ];
  $scope.search='';
  $scope.data=[];
  $scope.dataFull=[
    { 
       name:'test'
      ,sku:'00001'
      ,locations:'ny, nj, pa'
      ,price:1
    } 
    ,{
       name:'hello'
      ,sku:'00002'
      ,locations:'ny'
      ,price:1
    } 
    ,{
       name:'world'
      ,sku:'00003'
      ,locations:'nj, pa'
      ,price:1
    }
  ];
  
  $scope.$watch('options.nameConvention',function(value){
    for (var index in $scope.data){
      if(!$scope.data.hasOwnProperty(index)) continue;
      var row=$scope.data[index];
      
      switch(value){
        case "uppercase":
          row.name=row.name.toUpperCase();
          break;
        default:
        case "lowercase":
          row.name=row.name.toLowerCase();
          var _name=row.name.split(' ');
          
          for(var i=0; i<_name.length; i++) {
            _name[i]=_name[i].charAt(0).toUpperCase() + _name[i].slice(1)  
          }
          
          row.name=_name.join(' ');
          break;
        
      }
    }
  });
  $scope.$watch('search',function(value){
    $scope.data=[];
    
    if(typeof value=='undefined' || value.length == 0){
      return $scope.data=$scope.dataFull;
    }
    
    for (var i=0; i<$scope.dataFull.length; i++) {
      var row=$scope.dataFull[i];
      
      for(var col in $scope.columns) {
        if(!$scope.columns.hasOwnProperty(col)) continue;
        
        var _col=$scope.columns[col];
        
        if(typeof row[_col] == "undefined") continue;
        
        if(row[_col].toString().indexOf(value) >= 0)
          $scope.data.push(row);
      }
    }
  });
  
  $scope.delRow=function(index){
    $scope.data.splice(index,1);
  };
  
  $scope.insertRow=function(){
    $scope.data.push({
       name:''
      ,sku:''
      ,location: ''
      ,price:0
    });
  };
});