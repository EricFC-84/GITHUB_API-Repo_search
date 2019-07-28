const url_GITHUB_USERS = "https://api.github.com/users/";

function searchUser(event) {
    event.preventDefault();

    let userName = $("#searchInput")[0].value;
    console.log(userName);
    $.ajax({
        url: url_GITHUB_USERS + userName,
        success: function (response) {
            $("#resultsList").empty();
            $("#notFound").css("display", "none");
            loadResults(response);
            $(".userResults").css("display", "block")
            
        },
        error: function (response) {
            console.log("not found")
            $("#resultsList").empty();
            $(".userResults").css("display", "none")
            $("#notFound").css("display", "block");
        }
    })
}

function loadResults(results) {
    //USER INFO
    $(".userPic > img").attr("src", results["avatar_url"])
    $(".userPic > img").attr("alt","@" + results["login"])

    $("#userLogin").text("@" + results["login"])
    $("#userName").text(results["name"])

    //REPOS INFO
    let url_USER_REPOS = results["repos_url"];
    let list_of_repos;
    $.get(url_USER_REPOS, function (list_of_repos) {
        DOM_REPOS_LIST(list_of_repos)
    })
}

function DOM_REPOS_LIST(repos) {

    $("#resultsList").append("<tbody></tbody>")

    if (repos.length == 0) {
        $("#resultsList > tbody").append(`
        <tr>
            <td>This user has no public repositories</td>    
        </tr>
    
    `)
    } else {
        for (let i = 0; i < repos.length; i++) {
            fill_table_row(repos[i]);
        }
    }
}

function fill_table_row(repoData) {
    let name = repoData["name"];
    let url = repoData["svn_url"];
    let fork_count = repoData["forks_count"];
    let star_count = repoData["stargazers_count"];
    let description = repoData["description"];
    $("#resultsList > tbody").append(`
        <tr class="singleRepoInfo">
            <td><a href = ${url} target="_blank" class="repoLink" title="${description}">${name}</a>
            <td><i class="fa fa-star" aria-hidden="true"></i> ${star_count}</td>
            <td><i class="fa fa-code-fork" aria-hidden="true"></i> ${fork_count}</td>    
        </tr>
    
    `)

}

/* function preventRefresh(event) {
}
 */
//svn_url
//name
//forks or forks_count
//stargazers_count