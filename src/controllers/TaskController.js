function index(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM empleado', (err, tasks) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/index', { tasks });
    });
  });
}

function create(req, res) {

  res.render('tasks/create');
}

function store(req, res) {
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query('INSERT INTO empleado SET ?', [data], (err, rows) => {
      res.redirect('/tasks');
    });
  });
}

function destroy(req, res) {
  const id = req.body.id;

  req.getConnection((err, conn) => {
    conn.query('DELETE FROM empleado WHERE cedula = ?', [id], (err, rows) => {
      res.redirect('/tasks');
    });
  })
}

function edit(req, res) {
  const id = req.params.id;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM empleado WHERE cedula = ?', [id], (err, tasks) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/edit', { tasks });
    });
  });
}

function update(req, res) {
  const id = req.params.id;
  const data = req.body;

  console.log(data);
  console.log(id);
  
  
  req.getConnection((err, conn) => {
    conn.query('UPDATE empleado SET ? WHERE cedula = ?', [data, id], (err, rows) => {
      res.redirect('/tasks');
    });
  });
}


module.exports = {
  index: index,
  create: create,
  store: store,
  destroy: destroy,
  edit: edit,
  update: update,
}