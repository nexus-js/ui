// Jesse Allison 2011
// nexus - shared functions for javascript UI objects

function ajax_send (command, id, data) {
	new Ajax.Request(command, {parameters: {id: id, data: data}});
}


