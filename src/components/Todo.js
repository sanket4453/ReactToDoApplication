import React, {useState, useEffect} from 'react';
import Todoicon from '../images/todo-logo.png'
import DeleteIcon from '../images/trash-btn.svg'
import EditIcon from '../images/edit-icon.svg'


const Todo = () => {
    //get from local storage
    const getDataLocalStorage =()=>{
        const tasks = localStorage.getItem('lists')

        if(tasks){
            return JSON.parse(localStorage.getItem('lists'))
        }else {
            return [];
        }
    }

    const [inputData, setInputData] = useState('')
    const [listData, setListData] = useState(getDataLocalStorage())
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null)
    
    const addItem = () =>{
        //let taskId=1;
        if(!inputData){
           alert("Please Fill Task") 
        }else if(inputData && !toggleSubmit){
            setListData(
                listData.map((task) =>{
                    if(task.id === isEditItem){
                        return{...task, name: inputData}
                    }
                    return task;
                })
            )
             setToggleSubmit(true)
             setInputData('')
             setIsEditItem(null)
        }
        else{
         const allInputData = {
             id: new Date().getTime().toString(),
             name:inputData
         }
        // ++taskId;
        setListData([...listData,allInputData]);
       
        setInputData('')
       }
    }
    const DeleteTask = (index) =>{
      //  console.log(index)
        const updatedlist = listData.filter((task) =>{
            return index !== task.id;
        })
        setListData(updatedlist);
    }

    const EditItem = (id) =>{
        let newEditItem = listData.find((task) =>{
            return task.id === id
        });
        console.log(newEditItem)
        setToggleSubmit(false)
       setInputData(newEditItem.name)
        setIsEditItem(id)
    }


   const handleKeyPress = (event) =>{
        if(event.key === 'Enter'){
            {addItem()}
        }
    }
    // store to local storage
    useEffect(() => {
        localStorage.setItem('lists',JSON.stringify(listData))
       
    }, [listData])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={Todoicon} alt="todologo" />
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder=" Add Your Task..!!"
                        value={inputData}
                        onChange={(e) => setInputData(e.target.value)}
                        onKeyPress={handleKeyPress}
                    
                        />
                        {
                            toggleSubmit ?  <i className="fa fa-plus add-btn" title="Add Item"
                            onClick={addItem}> </i> : <i className="fa fa-edit add-btn" title="Edit Item" onClick={addItem}> </i>
                        }
                      
                        
                        
                    </div>

                    <div className="showItem">
                        {
                        listData.map((task) =>{
                         return(
                            <div className="eachItem" key={task.id}>
                                <h3>{task.name}</h3>
                                <div className="todo-btn">
                                   <img src={EditIcon} className="edit-btn" title="Edit Item" onClick={()=>EditItem(task.id)}/>
                                   <img src={DeleteIcon} alt="deleteicon" className="delete-btn" title="Delete Item"
                                   onClick={()=>DeleteTask(task.id)} />

                                </div>
                                
                            </div>
    
                            )
                        })
                    }       
                       
                    </div>

                    {/* <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove-All"
                        onClick={RemoveAll}
                        ><span>Check List</span></button>
                    </div> */}

                </div>
            </div>
        </>
    )
}

export default Todo;




//new Date().getTime.toString()