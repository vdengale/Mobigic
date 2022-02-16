import React, { useState, useEffect } from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";


export default function Grid() {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    rows: 0,
    columns: 0,
  });

  const [newArr, setNewArr] = useState([])

  const [arr] = useState({
    col: { cols: [] },
    row: { rows: [] },
  });

  const [search, setSearch] = useState([{}])
  const [text, setText] = useState([])
  const [render, setRender] = useState(false)

  useEffect(() => {

    // Wait for 4 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    setIsLoading(true)
  }, []);

  // Custom css for loader
  const override = `
display: block;
margin: 0 auto;
border-color: red;
`;


  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log(data);
  }

  function submit() {
    // console.log('hii m grid')
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    function generateString(length) {
      let result = " ";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    let temp = [];
    for (let i = 0; i < data.rows; i++) {
      temp.push(generateString(data.columns).split(""));
    }

    arr.col.cols = [...temp];
    setNewArr([...temp])
    // console.log(arr.col.cols = [...temp])
  }

  function searchText(e) {
    setSearch([e.target.value])
    console.log(search);
    if (search !== "") {
      setText(newArr.filter((name) => (
        name.temp.includes(search)
      )))
      setRender(!render)

    } else {
      setText(newArr)
    }
    setRender(true)
  }

  return (

    isLoading ?

      // If page is still loading then splash screen
      <PacmanLoader color={'#36D7B7'} isLoading={isLoading}
        css={override} size={150} /> :
      <div className='container mt-5 lg'>
        <div className='container p-5 border shadow w-50 bg-light'>
          <div className="mb-3">
            <span style={{ color: "blue" }}>Number of Rows : </span> <input type="text" id="inputPassword5" onChange={handleChange} name="rows" />
          </div>
          <div>
            <span style={{ color: "blue" }}>Number of Columns: </span> <input type="text" id="inputPassword5" onChange={handleChange} name="columns" />
          </div>
          <div className='p-4'>
            <button type="submit" className='btn btn-success' onClick={submit}>Submit</button>
          </div>
        </div>

        <h3 className='mt-2'> Grid Creation Done </h3>
        <table className="container mt-4">
          <tbody>

            {newArr.map((ele, index) => {

              return (
                <tr key={index}>
                  <td>
                    {ele.map((ele1) => {
                      return ele1;
                    })}
                  </td>
                  <br />
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="container-fluid mt-4">
          <form className="d-flex d-grid gap-3 col-2 mx-auto lg">
            <input className="form-control" type="text" onChange={searchText} placeholder="Search text" aria-label="Search" />

          </form>
        </div>
      </div>
  )
}