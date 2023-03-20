const db = require ('./db');
const Sequelize = require('sequelize');

const getAllStudents = async (course) => {
    queryt="SELECT sum(total_cart.total_item) as total_item from "
    +"(SELECT SUM(c.quantidade) * valor AS total_item FROM carrinhos c "
    +", produtos p WHERE c.cliente_id = 1 AND c.produto_id = p.id GROUP BY produto_id ) total_cart"
    queryx="SELECT sum(total_cart.total_item) as total_item from "
    + "(SELECT SUM(c.quantidade) * valor AS total_item "
    + "FROM carrinhos c , produtos p WHERE c.cliente_id = 1 AND c.produto_id = p.id " 
    + "GROUP BY produto_id) total_cart ; "
    const students = await db.sequelize.query(queryx) 
       // console.log(students)
        return students;
        
    }

   let resultado = getAllStudents();
   resultado.then(console.log)