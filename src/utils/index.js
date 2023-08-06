/**
 * deepTree
 * 此程序用作操作扁平数据，变成树形解构
 */
export function deepTree(list) {
  //定义最终的结果集
  const result = [];
  //1.先定义一个map来做映射
  const map = {};
  //2.遍历list追加到map中
  list.forEach((item) => {
    //做一个简单浅拷贝
    map[item.id] = { ...item };
  });
  //3.整理map，并且追加到result当中
  list.forEach((item) => {
    // 根据 item.parentId 来决定当前 item 是属于谁的子级
    // item.parentId 如果为 null 则表示为一级，直接追加到 result 中
    if(!item.parentId){
        result.push(map[item.id]);
    }else{
        //不是顶级数据，说明存在儿子，准备给父级item新增children键值对
        //做判断。判断此父级item是否存在children键值对
        if(map[item.parentId].children){
            //存在children，直接push给children做新增
            map[item.parentId].children.push(map[item.id])
        }else{
            //没有children，新建一个children剪子对，children的值，是一个数组
            map[item.parentId].children=[ map[item.id]]
        }
    }
   
  });
  return  result
}