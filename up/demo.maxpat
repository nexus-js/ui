{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 6,
			"minor" : 0,
			"revision" : 8
		}
,
		"rect" : [ 41.0, 53.0, 512.0, 578.0 ],
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
					"id" : "obj-114",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 341.0, 123.5, 96.0, 124.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 129.0, 246.0, 181.0, 96.0 ],
					"varname" : "multislidernx807966"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Avenir Medium",
					"fontsize" : 12.0,
					"id" : "obj-112",
					"maxclass" : "number",
					"maximum" : 100,
					"minimum" : 20,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 146.0, 200.0, 50.0, 23.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 129.0, 168.0, 50.0, 23.0 ],
					"varname" : "numbernx3589575"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-106",
					"maxclass" : "dial",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 12.0, 271.0, 89.0, 89.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 12.0, 130.0, 99.0, 99.0 ],
					"varname" : "dialnx4477533"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Avenir Medium",
					"fontsize" : 12.0,
					"id" : "obj-99",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 146.0, 149.0, 92.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 129.0, 130.0, 92.0, 21.0 ],
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
					"patching_rect" : [ 12.0, 157.0, 45.0, 39.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 129.0, 206.0, 92.0, 23.0 ],
					"text" : "check check",
					"varname" : "commentnx628315"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-88",
					"maxclass" : "bpatcher",
					"name" : "nexusUp.maxpat",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 12.0, 384.0, 334.0, 134.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 12.0, 384.0, 316.0, 150.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-110",
					"maxclass" : "slider",
					"min" : 100.0,
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 272.0, 19.0, 55.0, 198.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 255.0, 27.0, 55.0, 198.0 ],
					"size" : 200.0,
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
					"presentation_rect" : [ 12.0, 246.0, 96.0, 96.0 ],
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
					"min" : 200.0,
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 12.0, 25.0, 99.0, 99.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 12.0, 19.0, 99.0, 99.0 ],
					"size" : 100.0,
					"varname" : "dialnx139013"
				}

			}
 ],
		"lines" : [  ],
		"dependency_cache" : [ 			{
				"name" : "nexusUp.maxpat",
				"bootpath" : "/Library/WebServer/Documents/nxui/up",
				"patcherrelativepath" : "",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "nexusUp.js",
				"bootpath" : "/Library/WebServer/Documents/nxui/up",
				"patcherrelativepath" : "",
				"type" : "TEXT",
				"implicit" : 1
			}
 ]
	}

}
