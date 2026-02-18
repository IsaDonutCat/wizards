function Student ({first = "John", last = "Doe", year="N/A", cou1="TBD", cou2="TBD", cou3="TBD"})
{
    return (
        <div class="stuDiv">
            <div class = "stuInfo">
            <h1 class = "name">{first} {last}</h1>
            <h2 class = "year">Year {year}</h2>
            </div>
            <div class = "couInfo">
                <p>Courses:</p>
                <ul class = "couList">
                    <li class = "couItem">{cou1}</li>
                    <li class = "couItem">{cou2}</li>
                    <li class = "couItem">{cou3}</li>
                </ul>
            </div>
        </div>
    );
}

export default Student;