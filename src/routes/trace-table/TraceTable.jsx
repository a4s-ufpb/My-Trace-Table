function TraceTable() {
  const e = localStorage.getItem("exercice")
  if(e) {
    console.log(JSON.parse(e))
  }
  return <div>TraceTable</div>;
}

export default TraceTable;
