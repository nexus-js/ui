{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 6,
			"minor" : 0,
			"revision" : 8
		}
,
		"rect" : [ 75.0, 53.0, 602.0, 537.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Avenir Medium",
		"gridonopen" : 0,
		"gridsize" : [ 10.0, 10.0 ],
		"gridsnaponopen" : 0,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"boxanimatetime" : 200,
		"imprint" : 0,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"boxes" : [ 			{
				"box" : 				{
					"fontname" : "Avenir Medium",
					"fontsize" : 12.0,
					"id" : "obj-99",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 134.0, 196.0, 92.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 129.0, 143.0, 92.0, 21.0 ],
					"text" : "sendamessage!",
					"varname" : "messagenx8830286"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Avenir Medium",
					"fontsize" : 12.0,
					"frgb" : 0.0,
					"id" : "obj-96",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 50.0, 174.0, 45.0, 39.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 129.0, 176.0, 92.0, 23.0 ],
					"text" : "check check",
					"varname" : "commentnx628315"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-88",
					"maxclass" : "bpatcher",
					"name" : "nxUp.maxpat",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 12.0, 384.0, 316.0, 135.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 12.0, 384.0, 316.0, 135.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-110",
					"maxclass" : "slider",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 272.0, 19.0, 55.0, 198.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 255.0, 27.0, 55.0, 198.0 ],
					"varname" : "slidernx4058360"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-109",
					"maxclass" : "toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 341.0, 19.0, 96.0, 96.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 12.0, 129.0, 96.0, 96.0 ],
					"varname" : "togglenx5918670"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-107",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 146.0, 19.0, 98.0, 98.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 129.0, 19.0, 98.0, 98.0 ],
					"varname" : "buttonnx4436959"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-105",
					"maxclass" : "dial",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 12.0, 19.0, 99.0, 99.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 12.0, 19.0, 99.0, 99.0 ],
					"varname" : "dialnx139013"
				}

			}
 ],
		"lines" : [  ],
		"dependency_cache" : [ 			{
				"name" : "nxUp.maxpat",
				"bootpath" : "/Library/WebServer/Documents/NexusUI/up/nexusUpDemo",
				"patcherrelativepath" : "",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "nexusUp.js",
				"bootpath" : "/Library/WebServer/Documents/NexusUI/up/nexusUpDemo",
				"patcherrelativepath" : "",
				"type" : "TEXT",
				"implicit" : 1
			}
 ]
	}

}
